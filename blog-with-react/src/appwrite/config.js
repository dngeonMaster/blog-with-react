import conf from "../conf/conf";
import {client,ID,Databases,Storage,Query} from "appwrite"

export class Service{
    client= new client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteprojectID)
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwritedataBaseId,
                conf.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    

                }
            )
        } catch (error) {
            console.log("Appwrite servie :: createPost :: error",error);
        }
    }

    async updatePost({slug,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwritedataBaseId,
                conf.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite servie :: UpdatePost :: error",error);
        }
    }

    async deletePost({slug}){
        try {
            await this.databases.deleteDocument(
                conf.appwritedataBaseId,
                conf.appwritecollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite servie :: deletePost :: error",error);
            return false;
        }

    }
}