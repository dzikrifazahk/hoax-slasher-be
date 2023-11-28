import { CommonColumn } from "src/common/column/common-column";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'community' })
export class CommunityEntity extends CommonColumn {
    @PrimaryGeneratedColumn('uuid')
    id_community: string;

    @Column({
        name: 'community_name',
        type: 'varchar',
        length: 255,
    })
    communityName: string;

    @Column({
        name: 'community_description',
        type: 'text',
    })
    communityDescription: string;

    @Column({
        name: 'community_status',
        type: 'varchar',
    })
    communityStatus: string;

    @Column({
        name: 'community_address',
        type: 'varchar',
    })
    communityAddress: string;

}
