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

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwritedataBaseId,
                conf.appwritecollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite servie :: getPost :: error",error);
            return false;
        }
    }

    async getPost(queries=[Query.equal("stats","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwritedataBaseId,
                conf.appwritecollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite servie :: getPost :: error",error);
            return false;
        }
    }

    //file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwritebucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite servie :: uploadFile :: error",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwritebucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite servie :: deletePost :: error",error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwritebucketId,
            fileId
        )
    }
}