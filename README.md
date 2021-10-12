# licence-scan-js

GitHub Action for licence scanner (JS).

_This README is intended for Turku.py-meetup Hacktoberfest 2021 workshop instructions. Unfortunately we do not yet take other PRs than the ones created in the workshop._

## Purpose

Software projects typically use multiple third-party software components. Many times it is preferred to avoid introducing such dependencies that have copyleft-style open source licenses. Those require that you distribute the software under the same license you received it. For proprietary projects, this would mean the distribution of the proprietary code as well.

Detecting dependencies' licenses would be cumbersome manually, so it is best to let automated tools do the scanning. The tool is provided with a list of allowed licenses, and it will report errors if it finds such licenses within the software dependencies that are not included in the list.

Running the license scan should happen each time the code is changed. If incompatible dependencies are introduced, the change should not be merged with the main branch. GitHub action would be an ideal way of checking this automatically.

This action is intended to be used in JS/TS projects. The used scanner is js-green-licenses.

## Step-by-step Instructions

TODO
