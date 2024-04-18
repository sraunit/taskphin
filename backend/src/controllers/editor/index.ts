import { RequestWithUser } from '../../types';
import { Request, Response, NextFunction } from 'express';
import Documents from "../../models/document";
import Users from "../../models/user";
import snarkdown from 'snarkdown';
import fs from 'fs';
export async function createDocument(req: RequestWithUser, res: Response) {
    
   
    const username = req.username
    try {
        let markdown = req.body.markdown;
        let {content}=markdown;
        console.log(content);
        const user = await Users.findOne({ username });
        content=snarkdown(content);
        const document = await Documents.create({        
            content: content
        });

        user.documents.push(document.id);
        user.save();
        const response = { sucess: true, message: "document has been added" };
        res.json(response);
    } catch(err) {
        const response = { sucess: false, message: "invalid parameters" };
        res.json(err);
    }
}

export async function getDocuments(req : RequestWithUser, res: Response) {
    try{
        const username =req.username;
        const documents=(await Users.findOne({username}).populate({path:"documents"})).documents;
        res.json({sucesss:true,documents:documents})

    }
    catch{
        res.json({sucesss:false,message:"some error occured"});
    }       
}



export async function deleteDocument(req: RequestWithUser, res: Response) {
    const { title } = req.body;
    const username = req.username
    console.log(req.body);
    try {
        const user = await Users.findOne({ username })
        const document = await Documents.findOne({
            title:title
        });
        console.log(document);
        if (user.documents.includes(document._id)) {
            await Documents.deleteOne({title:title});
            const response = { sucess: true, message: "document has been deleted" };
            res.json(response);
        }
        else {
            const response = { sucess: false, message: "Unauthorized" };
            res.json(response);
        }
    } catch(err) {
       console.log(err);
        const response = { sucess: false, message: "invalid parameters" };
        res.json(response);
    }
}


export async function downloadDocument(req: RequestWithUser, res: Response) {
    const title  = req.params.title;
    const username = req.username
    console.log(title,username);
    try {
        const user = await Users.findOne({ username })
        const document = await Documents.findOne({
            title:title
        });
        console.log(document);
        if (user.documents.includes(document.id)) {
            fs.writeFileSync('index.html',document.content);
            res.contentType('html');
            res.download('index.html',function (err) {
                if (err) {
                    console.error('Error sending file:', err);
                } else {
                    console.log('Sent:', 'index');
                }
            });
        }
        else {
            const response = { sucess: false, message: "Unauthorized" };
            res.json(response);
        }
    } catch(err) {
       console.log(err);
        const response = { sucess: false, message: "invalid parameters" };
        res.json(response);
    }
}