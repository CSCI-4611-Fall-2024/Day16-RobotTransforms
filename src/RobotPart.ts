/** CSci-4611 Example Code
 * Copyright 2023+ Regents of the University of Minnesota
 * Please do not distribute beyond the CSci-4611 course
 * 
 * This example created by Prof. Evan Suma Rosenberg.
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class RobotPart extends gfx.Node3
{
    public name: string;
    public boneDirection: gfx.Vector3;
    public boneLength: number;

    constructor(name: string)
    {
        super();

        this.name = name;
        this.boneDirection = new gfx.Vector3();
        this.boneLength = 0;

        // Recursively create the robot skeleton
        if(this.name == 'root')
        {
            this.boneLength = 0.05;
            this.boneDirection.set(0.001, 1, 0);
            this.boneDirection.normalize();

            const child = new RobotPart('upperArm');
            child.position.copy(this.boneDirection);
            child.position.multiplyScalar(this.boneLength);
            this.add(child);
        }
        else if(this.name == 'upperArm')
        {
            this.boneLength = 0.5;
            this.boneDirection.set(0.001, 1, 0);
            this.boneDirection.normalize();

            const child = new RobotPart('middleArm');
            child.position.copy(this.boneDirection);
            child.position.multiplyScalar(this.boneLength);
            this.add(child);
        }
        else if(this.name == 'middleArm')
        {
            this.boneLength = 0.4;
            this.boneDirection.set(0.001, 1, 0);
            this.boneDirection.normalize();

            const child = new RobotPart('lowerArm');
            child.position.copy(this.boneDirection);
            child.position.multiplyScalar(this.boneLength);
            this.add(child);
        }
        else if(this.name == 'lowerArm')
        {
            this.boneLength = 0.4;
            this.boneDirection.set(0.001, 1, 0);
            this.boneDirection.normalize();

            const child = new RobotPart('endEffector');
            child.position.copy(this.boneDirection);
            child.position.multiplyScalar(this.boneLength);
            this.add(child);
        }
        else if(this.name == 'endEffector')
        {
            this.boneLength = 0.075;
            this.boneDirection.set(0.001, 1, 0);
            this.boneDirection.normalize();
        }
    }

    // Recursively create all the mesh geometry for the robot parts. 
    // Each mesh will be defined in the robot part's local space.
    createMeshes(): void
    {
        if(this.name == 'upperArm')
        {            
            const arm = gfx.Geometry3Factory.createBox(0.05, 0.05, this.boneLength);
            arm.lookAt(this.boneDirection);
            arm.position.add(gfx.Vector3.multiplyScalar(this.boneDirection, this.boneLength / 2));
            this.add(arm);

            const sphere = gfx.Geometry3Factory.createSphere(0.05, 1);
            sphere.lookAt(this.boneDirection);
            sphere.position.add(gfx.Vector3.multiplyScalar(this.boneDirection, this.boneLength));
            this.add(sphere);
        }
        else if(this.name == 'middleArm')
        {
            const arm = gfx.Geometry3Factory.createBox(0.05, 0.05, this.boneLength);
            arm.lookAt(this.boneDirection);
            arm.position.add(gfx.Vector3.multiplyScalar(this.boneDirection, this.boneLength / 2));
            this.add(arm);

            const sphere = gfx.Geometry3Factory.createSphere(0.05, 1);
            sphere.lookAt(this.boneDirection);
            sphere.position.add(gfx.Vector3.multiplyScalar(this.boneDirection, this.boneLength));
            this.add(sphere);
        }
        else if(this.name == 'lowerArm')
        {
            const arm = gfx.Geometry3Factory.createBox(0.05, 0.05, this.boneLength);
            arm.lookAt(this.boneDirection);
            arm.position.add(gfx.Vector3.multiplyScalar(this.boneDirection, this.boneLength / 2));
            this.add(arm);

            const sphere = gfx.Geometry3Factory.createSphere(0.05, 1);
            sphere.lookAt(this.boneDirection);
            sphere.position.add(gfx.Vector3.multiplyScalar(this.boneDirection, this.boneLength));
            this.add(sphere);
        }
        else if(this.name == 'endEffector')
        {
            const pincherRoot = new gfx.Node3();
            pincherRoot.lookAt(this.boneDirection);
            pincherRoot.position.add(gfx.Vector3.multiplyScalar(this.boneDirection, this.boneLength / 2));
            this.add(pincherRoot);

            const pincher = gfx.Geometry3Factory.createBox(0.025, 0.025, 0.1);
            console.log(pincher.position + " " + pincher.rotation);

            const leftPincher1 = pincher.createInstance(false);
            const MLP1 = gfx.Matrix4.makeIdentity();
            MLP1.multiply(gfx.Matrix4.makeRotationY(gfx.MathUtils.degreesToRadians(-45)));
            MLP1.multiply(gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, -0.05)));
            leftPincher1.setLocalToParentMatrix(MLP1, false);
            pincherRoot.add(leftPincher1);

            const leftPincher2 = pincher.createInstance(false);            
            const MLP2 = gfx.Matrix4.makeIdentity();
            MLP2.multiply(gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, -0.04)));
            MLP2.multiply(gfx.Matrix4.makeRotationY(gfx.MathUtils.degreesToRadians(75)));
            MLP2.multiply(gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, -0.04)));
            leftPincher2.setLocalToParentMatrix(MLP2, false);
            leftPincher1.add(leftPincher2);

            const rightPincher1 = pincher.createInstance(false);
            const MRP1 = gfx.Matrix4.makeIdentity();
            MRP1.multiply(gfx.Matrix4.makeRotationY(gfx.MathUtils.degreesToRadians(45)));
            MRP1.multiply(gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, -0.05)));
            rightPincher1.setLocalToParentMatrix(MRP1, false);
            pincherRoot.add(rightPincher1);

            const rightPincher2 = pincher.createInstance(false);            
            const MRP2 = gfx.Matrix4.makeIdentity();
            MRP2.multiply(gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, -0.04)));
            MRP2.multiply(gfx.Matrix4.makeRotationY(gfx.MathUtils.degreesToRadians(-75)));
            MRP2.multiply(gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, -0.04)));
            rightPincher2.setLocalToParentMatrix(MRP2, false);
            rightPincher1.add(rightPincher2);
        }    
        
        // Recursively call this function for each child robot part
        this.children.forEach((child: gfx.Node3)=>{
            if(child instanceof RobotPart)
            {
                child.createMeshes();
            }
        });
    }

    setPose(name: string, pose: gfx.Quaternion): void
    {
        if(this.name == name)
        {
            this.rotation.copy(pose);
        }
        else
        {
            // Recursively call this function for each child robot part
            this.children.forEach((child: gfx.Node3)=>{
                if(child instanceof RobotPart)
                    child.setPose(name, pose);
            });
        }
    }
}