import { BadRequestException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { UserEntity, UserRefreshTokenEntity, UserTypeEntity } from 'database/entities'
import { TimeIntervalS, UserType } from 'lib/enums'
import { en_US } from 'lib/locale'
import { EmailLoginDto, RegisterDto } from './dto'
import { ErrorResponse } from 'lib/common'
import { TokenTypes, UserToSave } from './types'
import { hashPassword } from './utils'
import { User } from 'lib/types'
import { GetUserDao } from './dao'

const T = en_US.auth

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(UserTypeEntity) private readonly userTypeRepository: Repository<UserTypeEntity>,
        @InjectRepository(UserRefreshTokenEntity) private userRefreshTokenRepository: Repository<UserRefreshTokenEntity>,
    ) {}

    async register(dto: RegisterDto, userType: UserType) {
        const { email, ...userData } = dto

        await this.checkEmail(email)

        const userTypeUUID = await this.getUserTypeUUID(userType)

        const { userUUID } = await this.saveUser({
            email,
            userTypeUUID,
            ...userData,
        })

        return {
            userUUID,
            email,
        }
    }

    async loginWithEmail(dto: EmailLoginDto) {
        const { email, password } = dto

        const user = await this.userRepository
            .createQueryBuilder('U')
            .select('U.userUUID, UT.type AS userType')
            .innerJoin(UserTypeEntity, 'UT', 'U.userTypeUUID = UT.userTypeUUID')
            .where('U.email = :email', { email })
            .andWhere('U.password = :password', { password: hashPassword(password) })
            .andWhere('U.isActive = 1 AND U.isDeleted = 0')
            .getRawOne<GetUserDao>()

        if (!user) {
            const error: ErrorResponse = {
                code: HttpStatus.BAD_REQUEST,
                message: T.invalidCredentials,
            }

            throw new BadRequestException(error)
        }

        return user
    }

    async checkEmail(email: string) {
        const isAlreadyRegistered = await this.userRepository.findOneBy({
            email,
            isDeleted: false,
        })

        if (isAlreadyRegistered) {
            const error: ErrorResponse = {
                code: HttpStatus.BAD_REQUEST,
                message: T.emailAlreadyUsed,
            }

            throw new BadRequestException(error)
        }
    }

    async getTokens(user: User, deviceId: string) {
        const [accessToken, refreshToken] = await Promise.all([this.getAccessToken(user), this.getRefreshToken(user, deviceId)])

        return {
            accessToken,
            refreshToken,
        }
    }

    removeTokens(userUUID: string, deviceId: string) {
        return this.userRefreshTokenRepository.delete({
            userUUID,
            deviceId,
        })
    }

    getLoggedUser(userUUID: string, userType: UserType) {
        return this.userRepository
            .findOneOrFail({
                select: ['userUUID'],
                where: {
                    userUUID,
                    isActive: true,
                    isDeleted: false,
                },
            })
            .then(({ userUUID }) => ({
                userUUID,
                userType,
            }))
            .catch(() => {
                throw new UnauthorizedException()
            })
    }

    private getAccessToken(user: User) {
        const { userUUID, userType } = user

        const payload = {
            tokenUse: TokenTypes.AccessToken,
            payload: {
                userType,
            },
        }

        const options = {
            expiresIn: TimeIntervalS.Day,
            subject: userUUID,
        }

        return this.jwtService.sign(payload, options)
    }

    private async getRefreshToken(user: User, deviceId: string) {
        const { userUUID, userType } = user

        const payload = {
            tokenUse: TokenTypes.RefreshToken,
            payload: {
                userType,
            },
        }

        const refreshToken = this.jwtService.sign(payload, {
            subject: userUUID,
        })

        // get current token for device
        const userRefreshTokenUUID = await this.userRefreshTokenRepository
            .findOneBy({
                userUUID,
                deviceId,
            })
            .then(userToken => userToken?.userRefreshTokenUUID)

        // save new token
        await this.userRefreshTokenRepository.save({
            userRefreshTokenUUID,
            token: refreshToken,
            userUUID,
            deviceId,
        })

        return refreshToken
    }

    private saveUser(user: UserToSave) {
        const { password, ...userData } = user

        return this.userRepository.save({
            ...userData,
            password: hashPassword(password),
        })
    }

    private getUserTypeUUID(userType: UserType) {
        return this.userTypeRepository
            .findOneByOrFail({
                type: userType,
            })
            .then(({ userTypeUUID }) => userTypeUUID)
    }
}
