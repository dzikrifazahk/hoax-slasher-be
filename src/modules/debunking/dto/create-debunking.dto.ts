import { ApiProperty } from "@nestjs/swagger";

export class CreateDebunkingDtoIn {
    @ApiProperty({
        type: String,
        example: 'Berita ini merupakan sebuah faktual berikut saya akan sertakan dengan bukti lainya'
    })
    evidence_description: string;

    @ApiProperty({
        type: String,
        example: 'https://news.detik.com/pemilu/d-7055115/anies-baswedan-akan-mulai-kampanye-dari-dki-jakarta'
    })
    evidence_links: string;

    @ApiProperty({
        type: String,
        example: 'usr/usr/'
    })
    file_path: string;

    @ApiProperty({
        type: String,
        example: 'file.png'
    })
    file_name: string;

    @ApiProperty({
        type: String,
        example: 'abbb64a1-ac91-4c8f-b48b-87d41c426041'
    })
    newsId: string;

    @ApiProperty({
        type: String,
        example: 'abbb64a1-ac91-4c8f-b48b-87d41c426041'
    })
    user_id: string;

}
