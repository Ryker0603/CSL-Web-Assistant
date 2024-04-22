// ==UserScript==
// @name         CSL Web Assistant
// @namespace    http://tampermonkey.net/
// @version      1.1
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
                        if (productNameInput && !productNameInput.value.includes('Compressor (NEW)') && !productNameInput.value.includes('Compressor NEW')) {
                            // 添加 "Compressor (NEW)" 到输入框内容的末尾
                            productNameInput.value += 'Compressor (NEW)';
                            productNameInput.dispatchEvent(new Event('input', { bubbles: true }));
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

    // 监测元素样式并执行动作的函数
    function checkStyleAndAct() {
        // 获取元素
        var inputElement = document.querySelector('.multiselect__input');

        // 检测元素的style属性是否为"width: 100%;"
        if (inputElement.style.width === '100%') {
            // 获取col-md-10元素的内容并过滤掉"Compressor"和"Add New Category"
            let content = document.querySelector('.col-md-10').textContent;
            content = content.replace('Compressor', ''); // 过滤掉"Compressor"
            content = content.replace('Add New Category', ''); // 过滤掉"Add New Category"

            // 模拟键盘输入并按下Enter键
            inputElement.value = content.trim();
            inputElement.dispatchEvent(new Event('input', { bubbles: true }));
            inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        }
    }

    // 定时检测元素样式
    setInterval(checkStyleAndAct, 1000); // 每秒检测一次
})();
