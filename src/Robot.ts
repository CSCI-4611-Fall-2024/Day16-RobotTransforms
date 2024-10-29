/** CSci-4611 Example Code
 * Copyright 2023+ Regents of the University of Minnesota
 * Please do not distribute beyond the CSci-4611 course
 * 
 * This example created by Prof. Evan Suma Rosenberg.
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'
import { RobotPart } from './RobotPart';

export class Robot extends gfx.Node3
{
    constructor()
    {
        super();

        // Recursively create the robot arm hierarchy
        this.add(new RobotPart('root'));  

        // Create meshes for the robot base
        const base = gfx.Geometry3Factory.createBox(0.5, 0.05, 0.5);
        base.position.y += 0.025;
        this.add(base);

        const sphere = gfx.Geometry3Factory.createSphere(0.1, 2);
        sphere.scale.set(1, 0.5, 1);
        sphere.position.y += 0.05;
        this.add(sphere);

        // Recursively create meshes for all the robot arm parts
        this.children.forEach((child: gfx.Node3) => {
            if(child instanceof RobotPart)
                child.createMeshes();
        });
    }

    setPose(name: string, pose: gfx.Quaternion): void
    {
        // Recursively call the setPose function
        this.children.forEach((child: gfx.Node3) => {
            if(child instanceof RobotPart)
                child.setPose(name, pose);
        });
    }
}