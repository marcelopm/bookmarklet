javascript: (function() {
    (function() {
        function getScript(url, success) {
            var script = document.createElement('script');
            script.src = url;
            var head = document.getElementsByTagName('head')[0];
            var completed = false;
            script.onload = script.onreadystatechange = function() {
                if (!completed && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                    completed = true;
                    success();
                    script.onload = script.onreadystatechange = null;
                    head.removeChild(script);
                }
            };
            head.appendChild(script);
        }
        getScript("http://code.jquery.com/ui/1.10.3/jquery-ui.js", function() {
            var selector = prompt("Please tell me what elements you wanna make it draggable", "jQuery selector like");
            var elements = $(selector);
            if (elements.length === 0) {
                alert('No elements found for the entered selector:' + selector);
                return false;
            }
            alert(elements.length + ' found! Starting the dragging baby!');
            var info = $('<div style="padding: 10px; position:fixed; left: 10px; top: 10px; background: rgba(240, 240, 240, 0.8); border: 1px solid red; min-width: 100px; min-height: 100px; z-index: 10000;"><center><span></span></center><br/><center><button type="button">Generate Code</button></center><textarea style="width: 300px; height: 300px; margin: 10px; display: none;"></textarea></div>');
            var textarea = info.find('textarea');
            var button = info.find('button');
            button.click(function() {
                var positions = '';
                elements.each(function(index) {
                    var position = $(this).position();
                    positions += 'top: ' + position.top + 'px, left: ' + position.left + 'px\n' + $.trim($(this).prop('outerHTML')) + '\n\n';
                });
                textarea.text(positions).show();
            }); /*info.hover(function() {if (info.is(':animated')) {info.stop().animate({opacity: '100'});}},function() {if (info.is(':animated')) {info.delay(2000).fadeOut(2000);}});*/
            $('body').append(info);
            elements.draggable({
                start: function(e, ui) {
                    textarea.hide();
                    info.show();
                },
                drag: function(e, ui) {
                    info.find('span').html('top: ' + ui.offset.top + 'px<br/>left: ' + ui.offset.left + 'px');
                },
                stop: function(e, ui) { /*info.delay(2000).fadeOut(2000);*/ }
            });
        });
    })()
})()
