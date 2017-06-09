<div class="top">


    <div class="wrapper">
        <div id="tiles"></div>
        <div id="slider-scrim-left" class="slider-scrim"></div>
        <div id="slider-scrim-right" class="slider-scrim"></div>
        <div class="slider-button slider-button-next" onclick="app.slider.next()"></div>
        <div class="slider-button slider-button-prev" onclick="app.slider.prev()"></div>
        <div class="slider-scrim-bottom"></div>
    </div>

</div>

<div class="bottom">
    <div id="tools">
        <div class="tools-set">
            <h3>Camera</h3>
            <div class="tools-container">
                <div id="camera-ortho" class="tools-set-svg">
                    <svg onclick="app.setCamera('ortho');">
                        <rect x="4" y="4" width="32" height="32"/>
                    </svg>
                </div>
                <div class="tools-set-arrow">
                    →
                </div>
                <div id="camera-perspective" class="tools-set-svg current">
                    <svg onclick="app.setCamera('perspective');">
                        <polygon points="14.52,3.465 0.914,24.252 1.104,25.386 33.417,36.535 34.55,35.779 39.086,8.379 "/>
                    </svg>
                </div>
            </div>
        </div>

        <div class="tools-set">
            <h3>Texture</h3>
            <div class="tools-container">
                <div id="texture-full" class="tools-set-svg current" onclick="app.setTexture('full');">
                    <img src="img/icons/full.png">
                </div>
                <div class="tools-set-arrow">
                    →
                </div>
                <div id="texture-mono" class="tools-set-svg" onclick="app.setTexture('mono');">
                    <img src="img/icons/monotone.png">
                </div>
            </div>
        </div>
    </div>



    <div id="time-slider-container">
        <div class="slider-container">
            <div id="time-slider">
                <div id="time-slider-handle" class="ui-slider-handle">
                    <div class="time-slider-text">
                        <div id="time-slider-year">xxx</div>
                        <div id="time-slider-slr">
                            <div class="time-slider-slr-pre">
                                Expected sea level rise
                            </div>
                            <div id="time-slider-slr-nr">
                                +0.0m
                            </div>
                        </div>
                    </div>
                </div>
                <div class="time-label" style="left:calc(200% / 4 - 25px)">
                    2100
                </div>
                <div class="time-label time-label-highlighted" style="left:calc(117% / 4 - 25px)">
                    Today
                </div>
                <div class="time-label" style="left:-25px">
                    1900
                </div>
            </div>
        </div>
    </div>
</div>