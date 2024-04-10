const conf={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwritedataBaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritecollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteprojectID:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwritebucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf