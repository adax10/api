import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    exampleUUID: string

    @CreateDateColumn({ select: false })
    createdAt: Date

    @UpdateDateColumn({ select: false })
    updatedAt: Date
}
