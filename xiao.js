const url = "https://api-xh.hsyuntai.com:443/hs-xh-single-web/r/173/20044/001"; // 请求的URL
const method = "GET"; // 请求方法

// 请求函数
function sendRequest() {
    const request = {
        url: url,
        method: method,
    };
    return new Promise((resolve, reject) => {
        $task.fetch(request).then(response => {
            // 请求成功
            console.log(`Response from URL: ${url}`);
            resolve(response.body); // 返回的响应数据
        }, reason => {
            // 请求失败
            console.log(`Error: ${reason.error}`);
            reject(reason.error);
        });
    });
}

// 并发请求函数：同时发起 3 次请求
async function makeConcurrentRequests() {
    let promises = [];
    for (let i = 0; i < 3; i++) {
        promises.push(sendRequest()); // 每次发起一个请求
    }

    try {
        let results = await Promise.all(promises); // 等待所有请求完成
        console.log("所有请求成功:", results); // 打印所有请求的结果
        $done(); // 结束脚本执行
    } catch (error) {
        console.error("部分请求失败:", error); // 打印失败的错误
        $done(); // 结束脚本
    }
}

makeConcurrentRequests(); // 运行并发请求函数
