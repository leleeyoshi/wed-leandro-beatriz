function toJSONString(form) {
    var obj = {
        cell_number: []
    };
    var elements = form.querySelectorAll('input, select, textarea');
    for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;

        if (obj[name] != null || name == 'cell_number') {
            if (name == 'cell_number' && value == '') {
                continue;
            }
            if (!obj[name].push) {
                obj[name] = [{ number: value }];
            }

            obj[name].push({ number: value });
        } else {
            obj[name] = value;
        }

    }

    return JSON.stringify(obj);
}