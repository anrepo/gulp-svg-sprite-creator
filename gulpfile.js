const   gulp = require('gulp'),
        del = require('del'),
        browserSync = require('browser-sync'),
        svgSprite = require('gulp-svg-sprite');


let config = {
    shape: {
        dimension: {
            maxWidth: 500,
            maxHeight: 500
        },
        spacing: {
            padding: 0
        },
        transform: [{
            "svgo": {
                "plugins": [
                    { removeViewBox: false },
                    { removeUnusedNS: false },
                    { removeUselessStrokeAndFill: true },
                    { cleanupIDs: false },
                    { removeComments: true },
                    { removeEmptyAttrs: true },
                    { removeEmptyText: true },
                    { collapseGroups: true },
                    { removeAttrs: { attrs: '(fill|stroke|style)' } }
                ]
            }
        }]
    },
    mode: {
        symbol: {
            dest : '.',
            sprite: 'sprite.svg'
        }
    }
};

gulp.task('makesprite', function() {
	return gulp.src("src/svg/*.svg")      
        .pipe(svgSprite(config)).on('error', function(error){ console.log(error); })
        .pipe(gulp.dest("dist/svg-sprites/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
    return gulp.src("src/index.html")
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function(){
    del.sync('dist/');
    console.log("Очищена папка dist/");
    gulp.watch('src/index.html', gulp.parallel('html'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});
});


gulp.task('default', gulp.parallel('html', 'makesprite', 'browser-sync', 'watch'));