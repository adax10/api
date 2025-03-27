import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Unique } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity({ name: 'userRefreshToken' })
@Unique(['userUUID', 'deviceId'])
export class UserRefreshTokenEntity {
    @PrimaryGeneratedColumn('uuid')
    userRefreshTokenUUID: string

    @Column()
    userUUID: string

    @Column()
    deviceId: string

    @CreateDateColumn({
        select: false,
    })
    createdAt: Date

    @UpdateDateColumn({
        select: false,
    })
    updatedAt: Date

    @ManyToOne(() => UserEntity, user => user.refreshToken)
    @JoinColumn({
        name: 'userUUID',
    })
    user: UserEntity
}
