/**
 * AB tests for Google Analytics
 * (c) Sipuni.com
 */

var abtest = {

    experimentId: 0,

    getExperimentScriptUrl: function(){
        return "//www.google-analytics.com/cx/api.js?experiment="+this.experimentId;
    },

    loadExperimentsScript: function(callback){
        jQuery.cachedScript = function( url, options ) {

            options = $.extend( options || {}, {
                dataType: "script",
                cache: true,
                url: url
            });

            return jQuery.ajax( options );
        };

        $.cachedScript( this.getExperimentScriptUrl() ).done(callback);
    },


    switchVariation: function(variation){
        $('.ab-test').hide().filter('.ab-'+(variation+1).toString()).show();
    },

    run: function(experimentId){
        var self = this;
        self.experimentId = experimentId;
        self.loadExperimentsScript(function(){
            self.switchVariation(cxApi.chooseVariation());
        });
    }

};
