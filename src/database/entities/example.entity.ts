import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'example' })
export class ExampleEntity {
    @PrimaryGeneratedColumn('uuid')
    exampleUUID: string

    @CreateDateColumn({ select: false })
    createdAt: Date

    @UpdateDateColumn({ select: false })
    updatedAt: Date
}
