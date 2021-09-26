(function($) {
    $.fn.translate = function(options) {
        var that = this;
        var settings = {
            css: "trn",
            lang: "en"
        };
        settings = $.extend(settings, options || {});
        if (settings.css.lastIndexOf(".", 0) !== 0)
            settings.css = "." + settings.css;
        var t = settings.t;
        this.lang = function(l) {
            if (l) {
                settings.lang = l;
                this.translate(settings);
            }
            return settings.lang;
        };
        this.get = function(index) {
            var res = index;
            try {
                res = t[index][settings.lang];
            } catch (err) {
                return index;
            }
            if (res)
                return res;
            else
                return index;
        };
        this.g = this.get;
        this.find(settings.css).each(function(i) {
            var $this = $(this);
            var trn_key = $this.attr("data-trn-key");
            var trn_key_placeholder = $this.attr("data-trn-key-placeholder");
            var trn_key_data_content = $this.attr("data-trn-key-data-content");
            var trn_key_title = $this.attr("data-trn-key-title");
            if ($this.attr("placeholder")) {
                if (!trn_key_placeholder) {
                    trn_key_placeholder = $this.attr("placeholder");
                    $this.attr("data-trn-key-placeholder", trn_key_placeholder);
                }
                $this.attr("placeholder", that.get(trn_key_placeholder));
            }
            if ($this.attr("data-content")) {
                if (!trn_key_data_content) {
                    trn_key_data_content = $this.attr("data-content");
                    $this.attr("data-trn-key-data-content", trn_key_data_content);
                }
                $this.attr("data-content", that.get(trn_key_data_content));
            }
            if ($this.attr("title")) {
                if (!trn_key_title) {
                    trn_key_title = $this.attr("title");
                    $this.attr("data-trn-key-title", trn_key_title);
                }
                $this.attr("title", that.get(trn_key_title));
            }
            if (!trn_key) {
                trn_key = $this.html();
                $this.attr("data-trn-key", trn_key);
            }
            $this.html(that.get(trn_key));
        });
        return this;
    };
})(jQuery);