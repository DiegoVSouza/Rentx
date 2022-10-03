import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Car } from "./Car";
import { v4 as uuidV4 } from "uuid";

@Entity("car_images")
class CarImage {
    @PrimaryColumn()
    id: string
    @ManyToOne(() => Car)
    @JoinColumn({ name: "car_id" })
    car_id: string
    @Column()
    images_name: string
    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { CarImage }

