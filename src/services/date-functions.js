
export function getDatesDifference(date1, date2){
    try{

        const date1Handler = new Date(date1);
        const date2Handler = new Date(date2);
        
        let monthsDifference = date1Handler.getMonth() - date2Handler.getMonth();
        let daysDifference = date1Handler.getDate() - date2Handler.getDate();
        let yearsDifference = date1Handler.getFullYear() - date2Handler.getFullYear();
        
        if((daysDifference < 0 && monthsDifference <= 0 ) || monthsDifference < 0 || yearsDifference < 0){
            return true
        }
        return false;

    } catch(error){
        return null
    }
}

export function formatDate(date=new Date()){
    try{
        return date.toISOString().split('T')[0]
    } catch(error){
        return (new Date()).toISOString().split('T')[0]
    }
}