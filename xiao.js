const url = "https://api-xh.hsyuntai.com:443/hs-xh-single-web/r/173/20044/001"; // 目标请求的URL
const method = "GET"; // 请求方法

// 请求函数
function sendRequest() {
    const request = {
        url: url,
        method: method,
    };
    return new Promise((resolve, reject) => {
        $task.fetch(request).then(response => {
            // 请求成功，检查状态码
            if (response.statusCode === 200) {
                console.log(`Response from URL: ${url}`);
                resolve(response.body);
            } else {
                console.log(`Error: Received status code ${response.statusCode}`);
                reject(`Status code: ${response.statusCode}`);
            }
        }, reason => {
            // 请求失败
            console.log(`Error: ${reason.error}`);
            reject(reason.error);
        });
    });
}

// 主函数：并发请求三次
async function makeConcurrentRequests() {
    let promises = [];
    for (let i = 0; i < 3; i++) {
        promises.push(sendRequest());
    }

    try {
        let results = await Promise.all(promises);
        console.log("All requests succeeded:", results);
        $done(); // 完成脚本
    } catch (error) {
        console.error("Some requests failed:", error);
        $done(); // 结束脚本
    }
}

makeConcurrentRequests(); // 执行请求
