

export const fileUpload = async( file ) => {

    if ( !file ) throw new Error ('Not file found');

    const cloudURL = 'https://api.cloudinary.com/v1_1/diyvdlxql/upload';
    const formData = new FormData();

    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch( cloudURL, {
            method: 'POST',
            body: formData,
        });

        if ( !resp.ok ) throw new Error ('The image could not be uploaded');

        const cloudResp = await resp.json();
        return cloudResp.secure_url;
        
    } catch (error) {
        
        throw error;
        
    }

}