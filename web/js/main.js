(async function ($, window) {

    async function doFetch() {
        $('table.messages .loading').show();
        let response = await fetch('fetch.php');
        onFetch(await response.json());
    }

    function onFetch(messages) {
        console.log(messages);
        $(".messages .message-row").remove();
        if (messages.length > 0) {
            $('.messages .loading').hide();
            messages.forEach(parseMessage);
            $('[rel=tooltip]').tooltip();
        } else {
            $('.messages .loading').show();
            $('.messages .loading > td').html('No messages found!');
        }
        $('.total-messages').html(messages.length);
    }

    function parseMessage(message, idx) {
        var headers = message['headers'],
            messageId = headers['Message-ID'][0].replace(/@.*$/,'');

        // Create the td's required
        const num = createTd('idx', idx+1),
            date = createTd('date', parseDate(headers['Date'])),
            subject = createTd('subject', headers['Subject']),
            actions = createTd('actions', `<button type="button" data-toggle="modal" data-target="#modal-${messageId}" class="btn btn-sm btn-primary">Show Email</button>`);

        var replyTo = '',
            fromOpts = 'colspan="2"';
        if(parseEmail(headers['Reply-To']) != parseEmail(headers['From'])) {
            replyTo = createTd('reply-to', parseEmail(headers['Reply-To']));
            fromOpts = '';
        }
        var from = createTd('from', parseEmail(headers['From']), fromOpts);

        // To address is special - it will show 'To' and X-Swift-To + X-Swift-BCC
        var toStr = parseEmail(headers['To']) + addHeader('X-Swift-To', parseEmail(headers['X-Swift-To']));
        if (headers['X-Swift-Bcc']) {
            toStr += addHeader('X-Swift-Bcc', parseEmail(headers['X-Swift-Bcc']));
        }
        var to = createTd('to', toStr);

        console.log('Parse X-Swift-To', headers['X-Swift-To']);

        const tr = `<tr data-message-id="${messageId}" class="message-row message-row-${idx}">${num} ${date} ${from} ${replyTo} ${to} ${subject} ${actions} </tr>`;
        $('table.messages tbody').append(tr);

        createModal(`modal-${messageId}`, headers['Subject'], message['body']);
    }

    function createTd(field, value, opts) {
        opts = opts || '';
        return `<td class="message message-${field}" ${opts}>${value}</td>`;
    }

    function createModal(id, title, body) {
        var modal = '<div id="' + id + '" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">';
        modal += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        modal += '<h4 class="modal-title">' + title + '</h4>';
        modal += '</div>';
        modal += '<div class="modal-body"><iframe id="iframe-'+id+'"></iframe></div>';
        modal += '</div></div></div>';

        $('#modalHolder').append(modal);

        $('#iframe-' + id).contents().find('body').html(body);
    }

    function addHeader(field, value) {
        if (field != '') {
            return `<div class="message-additional-header">
                <span class="field-name">${field}</span>
                <span class="field-value">${value}</span>
            </div>`;
        }

        return '';
    }

    function parseDate(date) {
        return moment(date * 1000).format('lll');
    }

    function parseEmail(email) {
        if (typeof email == "string") {
            return email;
        }

        var emailStr = '';
        for (key in email) {
            var name = email[key];
            if (name) {
                emailStr += `<abbr rel="tooltip" title=${key}>${name}</abbr><br>`;
            } else {
                emailStr = key;
            }
        }

        return emailStr;
    }

    async function clearMessages() {
        let response = await fetch('fetch.php?clear=1');
        onFetch(await response.json());
    }

    $('.action-fetch').click(doFetch);
    $('.action-clear').click(clearMessages);

    doFetch();
}(jQuery, this));
