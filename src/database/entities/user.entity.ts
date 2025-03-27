import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'
import { UserRefreshTokenEntity } from './user-refresh-token.entity'
import { UserTypeEntity } from './user-type.entity'

@Entity({ name: 'user' })
@Unique(['email'])
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    userUUID: string

    @Column()
    fullName: string

    @Column()
    email: string

    @Index()
    @Column({
        select: false,
    })
    password: string

    @Index()
    @Column({
        type: Boolean,
        default: false,
    })
    isActive: boolean

    @Index()
    @Column({
        type: Boolean,
        default: false,
    })
    isDeleted: boolean

    @CreateDateColumn({
        select: false,
    })
    createdAt: Date

    @UpdateDateColumn({
        select: false,
    })
    updatedAt: Date

    @ManyToOne(() => UserTypeEntity, userType => userType.users)
    @JoinColumn({
        name: 'userTypeUUID',
    })
    userType: UserTypeEntity

    @OneToMany(() => UserRefreshTokenEntity, refreshToken => refreshToken.user)
    refreshToken: Array<UserRefreshTokenEntity>
}
