import { Column } from "typeorm";

export class CommonColumn {
    @Column({
        name: 'created_at',
        type: 'timestamp',
        // default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true
        // default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}