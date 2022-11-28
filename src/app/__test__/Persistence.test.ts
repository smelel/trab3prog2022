import {app, setup} from "../../index"
import { afterAll, describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import { getConnection} from "typeorm"

describe("persistence test", () => {

    afterAll(async () => {
        await getConnection().close()
    });

    beforeAll(async () => {
        await setup()
    });


    it('teste /objetivo/list e /objetivo/delete', async () => {
        var agent = supertest(app);
        const postList = await agent.get('/objetivos');
        expect(postList.statusCode).toEqual(200);
        if (postList.body.length > 0){
        for(const e of postList.body){
           
            const data = { "id" : e.id };
            console.log("Encontrou o objetivo: ");
            console.log(data);
            
            const postDeleteObjetivo = await agent.delete('/objetivos').send(data);
                expect(postDeleteObjetivo.statusCode).toEqual(204);

            
        }
        }else{
            console.log("Não encontrou objetivos cadastrados, cadastrando novo objetivo e locais.");
            const data = { "descricao": "teste",
                        "pontos": 5,
                        };

            const postCreateObjetivo = await agent.post('/objetivos').send(data);
            console.log(postCreateObjetivo.body);
            expect(postCreateObjetivo.statusCode).toEqual(200);
        }
    });

    it('teste /local/list e /local/delete', async () => {
        var agent = supertest(app);
        const postList = await agent.get('/locais');
        expect(postList.statusCode).toEqual(200);
        if (postList.body.length > 0){
        for(const e of postList.body){
           
            const id = { "id" : e.id };
            console.log("Encontrou o local: ");
            console.log(id);
            
            const postDeleteLocal = await agent.delete('/locais').send(id);
            expect(postDeleteLocal.statusCode).toEqual(204);
            
        }
        }else{
            console.log("Não encontrou locais cadastrados, cadastrando novo local e objetivos.");
          
            //console.log(postFindObjetivo.body);
            const data = {"nome": "Local1",
                          "latitude": 100,
                          "longitude": 50
                        };

            const postCreateLocal = await agent.post('/locais').send(data);
            expect(postCreateLocal.statusCode).toEqual(200);
        }
    });



});