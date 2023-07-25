import React, { useState } from 'react';
import { Checkbox, Typography } from '@mui/material';

interface Department {
    id: number;
    name: string;
    subDepartments: SubDepartment[];
}

interface SubDepartment {
    id: number;
    name: string;
}

const Component2: React.FC = () => {
    // Hardcoded department data
    const departmentsData: Department[] = [
        {
            id: 1,
            name: 'Customer Service',
            subDepartments: [
                { id: 101, name: 'Support' },
                { id: 102, name: 'Customer Success' },
            ],
        },
        {
            id: 2,
            name: 'Design',
            subDepartments: [
                { id: 201, name: 'Graphic Design' },
                { id: 202, name: 'Product Design' },
                { id: 203, name: 'Web Design' },
            ],
        },
    ];

    // State to manage selected departments and sub-departments
    const [selected, setSelected] = useState<number[]>([]);
    // State to track if sub-options are visible for each department
    const [showSubOptions, setShowSubOptions] = useState<{ [key: number]: boolean }>({});

    const isDepartmentSelected = (departmentId: number) => {
        const subDepartments = departmentsData.find((dept) => dept.id === departmentId)?.subDepartments;
        if (subDepartments) {
            return subDepartments.some((subDept) => selected.includes(subDept.id));
        }
        return false;
    };

    const isSubDepartmentSelected = (subDepartmentId: number) => {
        return selected.includes(subDepartmentId);
    };

    const handleSelect = (id: number) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(id)) {
                // If the clicked sub-department is already selected, remove it
                return prevSelected.filter((item) => item !== id);
            } else {
                // Add the clicked sub-department to the selected array
                const newSelected = [...prevSelected, id];

                // Find the parent department
                const department = departmentsData.find((dept) =>
                    dept.subDepartments.some((subDept) => subDept.id === id)
                );

                // Add the parent department to the selected array if any of its sub-departments are selected
                if (department) {
                    department.subDepartments.forEach((subDept) => {
                        if (prevSelected.includes(subDept.id)) {
                            newSelected.push(department.id);
                        }
                    });
                }

                return newSelected;
            }
        });
    };

    const handleSelectAllSubDepartments = (departmentId: number, selectAll: boolean) => {
        const subDepartments = departmentsData.find((dept) => dept.id === departmentId)?.subDepartments;
        if (subDepartments) {
            if (selectAll) {
                setSelected((prevSelected) => [
                    ...prevSelected,
                    departmentId,
                    ...subDepartments.map((subDept) => subDept.id),
                ]);
            } else {
                setSelected((prevSelected) =>
                    prevSelected.filter((item) => !subDepartments.some((subDept) => subDept.id === item))
                );
            }
        }
    };

    const toggleSubOptionsVisibility = (departmentId: number) => {
        setShowSubOptions((prevShowSubOptions) => ({
            ...prevShowSubOptions,
            [departmentId]: !prevShowSubOptions[departmentId],
        }));
    };

    return (
        <div>
            {departmentsData.map((department) => (
                <div key={department.id} className="mb-4">
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSubOptionsVisibility(department.id)}>
                        <Typography>{showSubOptions[department.id] ? '-' : '+'}</Typography>
                        <Checkbox
                            checked={isDepartmentSelected(department.id)}
                            onChange={() =>
                                handleSelectAllSubDepartments(department.id, !isDepartmentSelected(department.id))
                            }
                        />
                        <Typography>{department.name}</Typography>
                    </div>

                    {showSubOptions[department.id] && (
                        <div>
                            {department.subDepartments.map((subDept) => (
                                <div className="flex ml-4 justify-start items-center" key={subDept.id}>
                                    <Checkbox
                                        color="secondary"
                                        checked={isSubDepartmentSelected(subDept.id)}
                                        onChange={() => handleSelect(subDept.id)}
                                    />
                                    {subDept.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Component2;
