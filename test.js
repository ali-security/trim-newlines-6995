import test from 'ava';
import fn from './';

test('main', t => {
    t.is(fn(''), '');
    t.is(fn('  '), '  ');
    t.is(fn('\n\n\r'), '');
    t.is(fn('\nx\n'), 'x');
    t.is(fn('\n\n\nx\n\n\n'), 'x');
    t.is(fn('\r\nx\r\n'), 'x');
    t.is(fn('\n\r\n\nx\n\r\n\n'), 'x');
});

test('start', t => {
    t.is(fn.start(''), '');
    t.is(fn.start('  '), '  ');
    t.is(fn.start('\n\n\r'), '');
    t.is(fn.start('\nx'), 'x');
    t.is(fn.start('\r\nx'), 'x');
    t.is(fn.start('\n\n\n\nx'), 'x');
    t.is(fn.start('\n\n\r\n\nx'), 'x');
    t.is(fn.start('x\n\n\r\n\n'), 'x\n\n\r\n\n');
});

test('end', t => {
    t.is(fn.end(''), '');
    t.is(fn.end('  '), '  ');
    t.is(fn.end('\n\n\r'), '');
    t.is(fn.end('x\n'), 'x');
    t.is(fn.end('x\r\n'), 'x');
    t.is(fn.end('x\n\n\n\n'), 'x');
    t.is(fn.end('x\n\n\r\n\n'), 'x');
    t.is(fn.end('\n\n\r\n\nx'), '\n\n\r\n\nx');
});

test('main - does not have exponential performance', function(t) {
    for (var index = 0; index < 45000; index += 1000) {
        var newlines = Array(index + 1).join('\n');
        var string = newlines + 'a' + newlines;
        var start = Date.now();
        fn(string);
        var difference = Date.now() - start;
        t.true(difference < 10, 'Execution time: ' + difference);
    }
});

test('start - does not have exponential performance', function(t) {
    for (var index = 0; index < 45000; index += 1000) {
        var newlines = Array(index + 1).join('\n');
        var string = newlines + 'a';
        var start = Date.now();
        fn.start(string);
        var difference = Date.now() - start;
        t.true(difference < 10, 'Execution time: ' + difference);
    }
});

test('end - does not have exponential performance', function(t) {
    for (var index = 0; index < 45000; index += 1000) {
        var newlines = Array(index + 1).join('\n');
        var string = 'a' + newlines;
        var start = Date.now();
        fn.end(string);
        var difference = Date.now() - start;
        t.true(difference < 10, 'Execution time: ' + difference);
    }
});
