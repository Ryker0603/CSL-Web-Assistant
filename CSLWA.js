// ==UserScript==
// @name         CSL Web Assistant
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  CSL Company Custom Tools
// @author       Ryker0603
// @match        https://merchant.newpages.com.my/manage/products/edit/*
// @match        https://merchant.newpages.com.my/manage/products/add?page=1&cat=0
// @icon         https://www.google.com/s2/favicons?sz=64&domain=newpages.com.my
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 监听DOM变化
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const compressorElements = document.querySelectorAll('.col-md-10');
                compressorElements.forEach(function(element) {
                    if (element.textContent.includes('Compressor')) {
                        const productNameInput = document.getElementById('for-product-name');
                        if (productNameInput && !productNameInput.value.includes('Compressor (NEW)')) {
                            // 添加 "Compressor (NEW)" 到输入框内容的末尾
                            productNameInput.value += ' Compressor (NEW)';
                        }
                    }
                });
            }
        });
    });

    // 配置观察器选项
    const config = { childList: true, subtree: true };

    // 选择目标节点
    const targetNode = document.body;

    // 启动观察器
    observer.observe(targetNode, config);
})();
