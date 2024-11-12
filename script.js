self.onInit = function() {
    const $scope = self.ctx.$scope;

    // Define columnDefs dynamically
    $scope.columnDefs = [
        { field: 'name', header: 'Name' },
        { field: 'label', header: 'Label' },
        { field: 'active', header: 'Active' },
        { field: 'type', header: 'Type' }
    ];

    // Populate displayedColumns based on columnDefs
    $scope.displayedColumns = $scope.columnDefs.map(col => col.field);
    
    // Initialize dataSource
    $scope.dataSource = [];

    // Fetch and transform data
    self.ctx.deviceService.getTenantDeviceInfos({ toQuery: function() { return "?pageSize=500&page=0"; } }).subscribe(res => {
        
        console.log(res.data)
        $scope.dataSource = res.data.map(el => ({
            name: el.name,
            label: el.label,
            active: el.active,
            type: el.type
        }));
        
        console.log($scope.dataSource)
        self.ctx.detectChanges();
    });
};
