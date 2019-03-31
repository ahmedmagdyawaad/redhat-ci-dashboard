# Copyright 2019 Arie Bregman
#
#    Licensed under the Apache License, Version 2.0 (the "License"); you may
#    not use this file except in compliance with the License. You may obtain
#    a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
#    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#    License for the specific language governing permissions and limitations
#    under the License.
CALLS = {'get_jobs':
         "/api/json/?tree=jobs[name,lastBuild[result,number,timestamp]]"}


def adjust_job_data(job):
    """Adjusts job data to unified structure supported by the app."""
    job['build'] = job.pop('lastBuild', None)
    if job['build']:
        job['build']['status'] = job['build'].pop('result')
    return job
