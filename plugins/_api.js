const Api = location.hostname.indexOf("steplack.com") !== -1
? {
    search: "//steplack.com/api/search.php",
    jobList: "//steplack.com/api/search_job_candidate.php",
    stationList: "//steplack.com/api/search_station_candidate.php",
    detail: "//steplack.com/api/detail.php",
    post: "/api_test/post.json"
} : { // local
    search: "/api_test/search.json",
    jobList: "/api_test/search_job_candidate.json",
    stationList: "/api_test/search_station_candidate.json",
    detail: "/api_test/detail.json",
    post: "/api_test/post.json"
}

export default Api;
