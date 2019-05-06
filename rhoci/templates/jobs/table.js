<script>
$(document).ready(function() {

$("#jobs_table").DataTable({
    "ajax": {
    'type': 'POST',
    'url': "{{ url_for('api.jobs', query_str=query_str) }}",
    'data': {"query_str": "aaaaaaaaaaaa", "asdasd": "asdads" },
    },
        "columns": [
          {"data": "name"},
          {"data": "last_build.status",
           "defaultContent": "None"
          },
          {"data": "release",
           "defaultContent": "None"
          },
          {"data": "last_build.timestamp",
           "defaultContent": "None"
          },
          {"data": "name"},
          {"data": "name"},
          ],
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        status = aData.last_build.status;
        {% include "tables/color_result.js" -%}
        columnDefs: [
            {
                targets:0,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
    console.log("{{ query_str }}");
                      return $('<a>')
                       .attr('href', data)
                       .text(data)
                       .wrap('<div></div>')
                       .parent()
                       .html();
                      }
                  else { return data; }
                }
            },
            {
                targets:[1],
                render: function ( data, type, row, meta ) {
                    data = '<a href="' + "{{ jenkins_url }}" + '/job/' + row['name'] + '/' + row['last_build']['number'] + '">' + row['last_build']['status'] + '</a>';
                    return data;
                }
            },
            {
                targets:4,
                render: function ( data, type, row, meta ) {
                    if(type === 'display' && row[1] != 0 && (row['last_build']['status'] == 'SUCCESS' || row['last_build']['status'] == 'UNSTABLE')){
                    data = '<a href="' + "{{ jenkins_url }}" + '/job/' + row['name'] + '/' + row['last_build']['number'] + '/testReport' + '">Tests</a>';
                    }
                    else {
                      data = 'No Tests';
                    }
                    return data;
                }
            },
            {
                targets:5,
                      render: function ( data, type, row, meta ) {
                      data = '<a href="' + "{{ jenkins_url }}" + '/job/' + row['name'] + '/' + row['last_build']['number'] + '/consoleFull"><img src="{{ url_for('static', filename='images/terminal.png') }}">';
                      return data;
                      }
            }
        ],
  processing: true,
  searchPane: {
        columns: [1, 2],
    },
  search: { "regex": true }, 
  deferRender: true,
});

});
</script>