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
from __future__ import absolute_import

import re


def get_job_class(job):
    """Returns job class."""
    if '_class' in job:
        if job['_class'] == 'com.cloudbees.hudson.plugins.folder.Folder':
            return 'folder'
    if 'DFG-' in job['name']:
        return 'DFG'
    elif 'util' in job['name']:
        return 'utility'


def get_DFG_name(job_name):
    """Returns DFG name."""
    return job_name.split('-')[1]


def get_component_name(job_name):
    """Returns component name."""
    comp = job_name.split('-')[2]
    NOT_COMPS = ["python", "networking", "openstack"]
    if comp in NOT_COMPS:
        return job_name.split('-')[2] + '-' + job_name.split('-')[3]
    else:
        return comp


def get_release(job_name):
    m = re.search(r"-\d{1,2}", job_name)
    return m.group().split('-')[1] if m else 0