require('validator')


const validate=(data)=>{
    const mandatoryField=['firstname','emailId','password'];
    const IsAllowed=mandatoryField.every((k)=>Object.keys(data).includes(k));

    if(!IsAllowed)
        throw new Error("Some Field Missing");

    if(!validator.isEmail(data.emailId))
        throw new Error("Invaalid Email");

    if(!validator.isStrongPassword(data.password))
        throw new Error(("Weak Password")); 


    }

    module.exports=validate;