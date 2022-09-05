

export async function send(){
    const transporter = createTransport({
        service:"gmail",
        auth:{
            user: "lopezchefchoufi.celian@gmail.com",
            pass: "enwburwetfldbmed"
        }
    })
    const mailOption = {
        from: "lopezchefchoufi.celian@gmail.com",
        to: emailMaxLike,
        subject:"test",
        text: "https://www.google.fr/" + idMaxLike


    }

    console.log(mailOption)
    await transporter.sendMail(mailOption, function (err){
        if (err){
            console.log(err)
        }
        else {
            console.log("email sent: " + infos.response)
        }
    })
}