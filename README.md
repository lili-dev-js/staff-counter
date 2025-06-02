## Just run it

```sudo docker compose up```

### Get

```localhost:3000/work-schedule/check?limit=10&offset=10```

response:

```
[
    {
        "id": 11,
        "workShifts": [
            {
                "id": 25,
                "startWorkShift": 1748944872,
                "endWorkShift": 1748994872,
                "employee": {
                    "id": 21,
                    "employeeIdentifier": "z221",
                    "name": "as1s1da",
                    "surname": "ddfgd",
                    "typeWorkingHours": "elastic"
                }
            }
        ],
        "errors": [
            {
                "id": 23,
                "startFirstShift": 1748944872,
                "endLastShift": 1748994872,
                "error": "Break to short",
                "employee": {
                    "id": 21,
                    "employeeIdentifier": "z221",
                    "name": "as1s1da",
                    "surname": "ddfgd",
                    "typeWorkingHours": "elastic"
                }
            }
        ]
    }
]
```

### POST

```localhost:3000/work-schedule/check```

body:

```
{

               "employees":[{
                    "employeeIdentifier":"z221",
                    "name":"as1s1da",
                    "surname":"ddfgd",
                    "typeWorkingHours":"elastic"
                }],
    "workShifts":[
                {
                "startWorkShift":1748888349,//2025-06-02 20h 19m 09s
                "endWorkShift":1748920749,//2025-06-03 05h 19m 09s
                "employeeIdentifier":"z221"
            },
                            {
                "startWorkShift":1748960349,//2025-06-03 16h 19m 09s
                "endWorkShift":	1748985549,//2025-06-03 23h 19m 09s
                "employeeIdentifier":"z221"
            }
    ]
}
```

response:

```
{
    "id": 60,
    "workScheduleCheck": "Work Schedule is correct"
}
```