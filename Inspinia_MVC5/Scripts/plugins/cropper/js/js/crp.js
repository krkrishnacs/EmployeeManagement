﻿"use strict";
var KTCropperDemo = {
    init: function () {
        var e, t, a;
        e = document.getElementById("image"),
            t = {
                crop: function (e) {
                    document.getElementById("dataX").value = Math.round(e.detail.x),
                        document.getElementById("dataY").value = Math.round(e.detail.y),
                        document.getElementById("dataWidth").value = Math.round(e.detail.width),
                        document.getElementById("dataHeight").value = Math.round(e.detail.height),
                        document.getElementById("dataRotate").value = e.detail.rotate,
                        document.getElementById("dataScaleX").value = e.detail.scaleX,
                        document.getElementById("dataScaleY").value = e.detail.scaleY;
                    var t = document.getElementById("img-preview");
                    t.innerHTML = "",
                        t.appendChild(a.getCroppedCanvas({
                            width: 256,
                            height: 160
                        }));
                    var n = document.getElementById("img-preview");
                    n.innerHTML = "",
                        n.appendChild(a.getCroppedCanvas({
                            width: 128,
                            height: 80
                        }));
                    var d = document.getElementById("img-preview");
                    d.innerHTML = "",
                        d.appendChild(a.getCroppedCanvas({
                            width: 64,
                            height: 40
                        }));
                    var o = document.getElementById("img-preview");
                    o.innerHTML = "",
                        o.appendChild(a.getCroppedCanvas({
                            width: 32,
                            height: 20
                        }))
                }
            },
            a = new Cropper(e, t),
            document.getElementById("cropper-buttons").querySelectorAll("[data-method]").forEach(function (e) {
                e.addEventListener("click", function (t) {
                    var n, d = e.getAttribute("data-method"), o = e.getAttribute("data-option"), r = e.getAttribute("data-second-option");
                    try {
                        o = JSON.parse(o)
                    } catch (t) { }
                    if (n = r ? o ? a[d](o) : a[d]() : a[d](o, r),
                        "getCroppedCanvas" === d) {
                        var i = document.getElementById("getCroppedCanvasModal").querySelector(".modal-body");
                        i.innerHTML = "",
                            i.appendChild(n)
                    }
                    var c = document.querySelector("#putData");
                    try {
                        c.value = JSON.stringify(n)
                    } catch (t) {
                        n || (c.value = n)
                    }
                })
            }),
            document.getElementById("setAspectRatio").querySelectorAll('[name="aspectRatio"]').forEach(function (e) {
                e.addEventListener("click", function (e) {
                    a.setAspectRatio(e.target.value)
                })
            }),
            document.getElementById("viewMode").querySelectorAll('[name="viewMode"]').forEach(function (n) {
                n.addEventListener("click", function (n) {
                    a.destroy(),
                        a = new Cropper(e, Object.assign({}, t, {
                            viewMode: n.target.value
                        }))
                })
            }),
            document.getElementById("toggleOptionButtons").querySelectorAll('[type="checkbox"]').forEach(function (n) {
                n.addEventListener("click", function (n) {
                    var d = {};
                    d[n.target.getAttribute("name")] = n.target.checked,
                        t = Object.assign({}, t, d),
                        a.destroy(),
                        a = new Cropper(e, t)
                })
            })
    }
};
KTUtil.ready(function () {
    KTCropperDemo.init()
});
