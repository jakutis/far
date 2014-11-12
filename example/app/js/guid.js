app.value('guid', function guid() {
    return Date.now().toString() + Math.random().toString();
});
