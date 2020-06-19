'use strict'

const Router = require('koa-router');
const voicemailMessages = require('./resources/voicemailMessages');
const voicemailBoxes = require('./resources/voicemailBoxes');

const router = new Router({ prefix:'/v2' });

const isEmpty = (value) => {
    if(!value || value == null || value.trim() === '') {
        return true;
    }
    return false;
}

//Voicemail boxes
router.get('/accounts/:accountid/vmboxes', async (ctx, next) => {
    ctx.body = {
        data: voicemailBoxes,
        timestamp: new Date(),
        status: 'success'
    };
    ctx.type = 'application/json';
    next();
});

//Voicemail messages
router.get('/accounts/:accountid/vmboxes/:_voicemailboxid/messages', async (ctx, next) => {
    const { _voicemailboxid } = ctx.params;
    if(!isEmpty(_voicemailboxid)) {
        const data = voicemailMessages.find(voicemail => voicemail.voicemailBoxId === _voicemailboxid);
        if(data) {
            ctx.body = {
                data: data.messages,
                timestamp: new Date(),
                status: 'success'
            };
            ctx.type = 'application/json';
            next();
        } else {
            ctx.throw(404);
        }
    } else {
        ctx.throw(400);
    }

});

//Update a voicemail message folder (status)
router.post('/accounts/:accountid/vmboxes/:_voicemailboxid/messages/:_mediaid', async (ctx, next) => {
    const { _voicemailboxid, _mediaid } = ctx.params;
    const { folder } = ctx.request.body;
    if(!isEmpty(_voicemailboxid) && !isEmpty(folder) && !isEmpty(_mediaid)) {
        const data = voicemailMessages.find(voicemail => voicemail.voicemailBoxId === _voicemailboxid);
        if(!data) {
            ctx.throw(404);
        }

        //Search for the specific message based on media_id
        const msg = data.messages.find(_message => _message.media_id === _mediaid);

        if(!msg) {
            ctx.throw(404);
        }

        msg.folder = folder;
        ctx.body = {
            "data": {
                ...msg,
                "transcription": {
                    "result": "success",
                    "text": "This is a test of the voicemail transcription."
                }
            },
            "status": "success"
        }
        ctx.type = 'application/json';
        next();
    } else {
        ctx.throw(400);
    }
});

module.exports = router;
