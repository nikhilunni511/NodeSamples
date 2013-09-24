


module.exports = function (apps, idata, odata) {
    if (idata)
    {
        this.idata = idata;
    }
    if (odata)
    {
        this.odata = odata;
    }

    this.current = null;

    this.index = 0;
    this.proc = null;
    this.callname = function (objtree, callname)
    {
        var Ver = (objtree.version == null) ? '' : objtree.version;

        var func = objtree.call[callname + Ver];
        if (func == null)
        {
            return objtree.call[callname];
        }
        return func;
    }

    this.callnext = function (objtree, status)
    {
        var ver = (objtree.version == null) ? '' : objtree.version;
        var current = null;

        if (this.proc != null)
        {
            this.proc(objtree, this.current, true);
            return;
        }
        if (objtree.current == null)
        {
            current = objtree.callname(objtree, objtree.call.start);
        }
        else
        {
            current = objtree.callname(objtree, objtree.current.next);
        }
        if (current != null)
        {
            objtree.current = current;
            current.func(objtree, current);
        }
        else
        {
            objtree.callend(objtree, false);
        }
    }
    this.callend = function (objtree, status)
    {
        if (this.proc != null)
        {
            this.proc(objtree, this.current);
            return;
        }
        var func = objtree.callname(objtree, 'end')
        if (func != null)
        {
            func(objtree, status);
        }
    }

    this.callor = function (objtree, mystruct, over) {

        if (over == true)
        {
            objtree.proc = null;
            objtree.index = 0;
            if (mystruct.callback != null)
            {
                mystruct.callback(true);
            }
            else
            {
                objtree.callnext(objtree, true);
            }
            return;
        }
        if (objtree.index >= mystruct.procs.length)
        {
            objtree.proc = null;
            objtree.index = 0;
            if (mystruct.callback != null)
            {
                mystruct.callback(false);
            }
            else
            {
                objtree.callend(objtree, false);
            }
            return;
        }

        var current = objtree.callname(objtree, mystruct.procs[objtree.index]);

        objtree.index = objtree.index + 1;

        objtree.proc = objtree.callor;

        if (current != null)
        {
            current.func(objtree, current);
        }
        else
        {

            objtree.callor(objtree, mystruct);
        }
    }
}