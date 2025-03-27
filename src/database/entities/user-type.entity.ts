import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UserType } from 'lib/enums'
import { DBTypes } from '../types'
import { UserEntity } from './user.entity'

@Entity({ name: 'userType' })
export class UserTypeEntity {
    @PrimaryGeneratedColumn('uuid')
    userTypeUUID: string

    @Column({
        type: DBTypes.Enum,
        enum: UserType,
        default: UserType.User,
    })
    type: UserType

    @CreateDateColumn({
        select: false,
    })
    createdAt: Date

    @UpdateDateColumn({
        select: false,
    })
    updatedAt: Date

    @OneToMany(() => UserEntity, user => user.userType)
    users: Array<UserEntity>
}
