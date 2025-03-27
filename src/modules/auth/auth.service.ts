import { BadRequestException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity, UserTypeEntity } from 'database/entities'
import { UserType } from 'lib/enums'
import { en_US } from 'lib/locale'
import { RegisterDto } from './dto'
import { ErrorResponse } from 'lib/common'
import { UserToSave } from './types'
import { hashPassword } from './utils'

const T = en_US.auth

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(UserTypeEntity) private readonly userTypeRepository: Repository<UserTypeEntity>,
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

    async checkEmail(email: string) {
        const isAlreadyRegistered = await this.userRepository.findOne({
            select: ['userUUID', 'userType'],
            where: {
                email,
                isDeleted: false,
            },
        })

        if (isAlreadyRegistered) {
            const error: ErrorResponse = {
                code: HttpStatus.BAD_REQUEST,
                message: T.emailAlreadyUsed,
            }

            throw new BadRequestException(error)
        }
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
            .findOneOrFail({
                select: ['userTypeUUID'],
                where: [
                    {
                        type: userType,
                    },
                ],
            })
            .then(({ userTypeUUID }) => userTypeUUID)
    }
}
