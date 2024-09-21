const url = "https://api-xh.hsyuntai.com:443/hs-xh-single-web/r/173/20044/001"; 
const method = "GET"; 

/**
 * 发送单个请求
 */
function sendRequest() {
    const request = {
        url: url,
        method: method,
    };

    console.log(`发送请求 ${method} ${url}`);

    return new Promise((resolve, reject) => {
        $task.fetch(request).then(response => {
            // 检查响应状态码
            if (response.statusCode === 200) {
                console.log(`请求成功: ${url}`);
                resolve(response.body); // 返回响应体
            } else {
                console.log(`请求失败，状态码: ${response.statusCode}`);
                reject(`请求失败，状态码: ${response.statusCode}`);
            }
        }).catch(reason => {
            console.log(`请求错误: ${reason.error}`);
            reject(reason.error);
        });
    });
}

/**
 * 并发发送多个请求
 */
async function makeConcurrentRequests() {
    let promises = [];
    const concurrentCount = 3; // 同时发送的请求数量

    for (let i = 0; i < concurrentCount; i++) {
        promises.push(sendRequest());
    }

    try {
        let results = await Promise.all(promises); // 等待所有请求完成
        console.log("所有请求成功:", results); // 打印所有请求的结果
        $notify("抢单成功", "所有请求已成功发送", "查看日志以获取详细信息");
    } catch (error) {
        console.error("部分请求失败:", error); // 打印失败的错误
        $notify("抢单失败", "部分请求未成功", `错误信息: ${error}`);
    } finally {
        $done(); // 结束脚本执行
    }
}

makeConcurrentRequests();
