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

module.exports = router;
