import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { criaSenhaCriptografada } from "../utils/senhaCriptografada";
import EnderecoEntity from "./endereco";
import PetEntity from "./PetEntity";


@Entity()
export default class AbrigoEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Column()
    senha: string;

    @Column({ unique: true })
    celular: string;

    @OneToOne(() => EnderecoEntity, {
      nullable: true,
      cascade: true,
      eager: true
    })
    @JoinColumn()
    endereco?: EnderecoEntity;

    @OneToMany(() => PetEntity, (pet) => pet.abrigo)
    pets!: PetEntity[];

    constructor( nome:string, email: string, senha: string, celular: string, endereco?: EnderecoEntity ){
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.celular = celular;
        this.endereco = endereco;
    }

    @BeforeInsert()
      @BeforeUpdate()
      private async criptografaSenha(){
        if(this.senha){
        this.senha = criaSenhaCriptografada(this.senha);
        }
      }
}