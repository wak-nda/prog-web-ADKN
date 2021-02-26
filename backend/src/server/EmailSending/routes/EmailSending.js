const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');

router.post('/api/mailing', async (ctx) => {
    const msg = ctx.request.body.msg;
    const subject = ctx.request.body.subject;
    const email = ctx.request.body.mail;
    const name = ctx.request.body.name;

    const mailjet = require('node-mailjet')
        .connect('381049ba9918bba1264fa0a8885d53ae', '2d5024c1a1cdbf4d89ec7690c3a982d5');
    const tag = "<h3>";
    const endingTag = "</h3>";
    const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "pkoffi5@gmail.com",
                        "Name": "Merveille"
                    },
                    "To": [
                        {
                            "Email": email,
                            "Name" : name
                        }
                    ],
                    "Subject": subject,
                    "TextPart": "My first Mailjet email",
                    "HTMLPart": tag.concat(msg, endingTag),
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        });
    await request
        .then((result) => {
            // console.log(result.body);
            const response =
                {
                    "res": true
                };
            f.success(ctx, JSON.stringify(response));
        })
        .catch((err) => {
            // console.log(err.statusCode);
            const response =
                {
                    "res": false,
                    "error": err
                };
            f.success(ctx, JSON.stringify(response));
        });
});


module.exports = router;

