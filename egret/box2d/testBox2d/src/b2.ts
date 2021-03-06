namespace b2{
    //define  by cyj
    export import  Color = Box2D.Common.b2Color;
    export import  Settings = Box2D.Common.b2Settings;
    export import  Mat22 = Box2D.Common.Math.b2Mat22;
    export import  Mat33 = Box2D.Common.Math.b2Mat33;
    export import  Math = Box2D.Common.Math.b2Math;
    export import  Sweep = Box2D.Common.Math.b2Sweep;
    export import  Transform = Box2D.Common.Math.b2Transform;
    export import  Vec2 = Box2D.Common.Math.b2Vec2;
    export import  Vec3 = Box2D.Common.Math.b2Vec3;
    export import  AABB = Box2D.Collision.b2AABB;
    export import  ContactID = Box2D.Collision.b2ContactID;
    export import  ContactPoint = Box2D.Collision.b2ContactPoint;
    export import  DistanceInput = Box2D.Collision.b2DistanceInput;
    export import  DistanceOutput = Box2D.Collision.b2DistanceOutput;
    export import  DistanceProxy = Box2D.Collision.b2DistanceProxy;
    export import  DynamicTree = Box2D.Collision.b2DynamicTree;
    export import  DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase;
    export import  DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode;
    export import  Manifold = Box2D.Collision.b2Manifold;
    export import  ManifoldPoint = Box2D.Collision.b2ManifoldPoint;
    export import  OBB = Box2D.Collision.b2OBB;
    export import  RayCastInput = Box2D.Collision.b2RayCastInput;
    export import  RayCastOutput = Box2D.Collision.b2RayCastOutput;
    export import  Segment = Box2D.Collision.b2Segment;
    export import  SimplexCache = Box2D.Collision.b2SimplexCache;
    export import  TOIInput = Box2D.Collision.b2TOIInput;
    export import  WorldManifold = Box2D.Collision.b2WorldManifold;
    export import  atures = Box2D.Collision.Features;
    export import  roadPhase = Box2D.Collision.IBroadPhase;
    export import  CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    export import  EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef;
    export import  EdgeShape = Box2D.Collision.Shapes.b2EdgeShape;
    export import  MassData = Box2D.Collision.Shapes.b2MassData;
    export import  PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    export import  Shape = Box2D.Collision.Shapes.b2Shape;
    export import  Body = Box2D.Dynamics.b2Body;
    export import  BodyDef = Box2D.Dynamics.b2BodyDef;
    export import  ContactFilter = Box2D.Dynamics.b2ContactFilter;
    export import  ContactImpulse = Box2D.Dynamics.b2ContactImpulse;
    export import  ContactListener = Box2D.Dynamics.b2ContactListener;
    export import  DebugDraw = Box2D.Dynamics.b2DebugDraw;
    export import  DestructionListener = Box2D.Dynamics.b2DestructionListener;
    export import  FilterData = Box2D.Dynamics.b2FilterData;
    export import  Fixture = Box2D.Dynamics.b2Fixture;
    export import  FixtureDef = Box2D.Dynamics.b2FixtureDef;
    export import  World = Box2D.Dynamics.b2World;
    export import  Contact = Box2D.Dynamics.Contacts.b2Contact;
    export import  ContactEdge = Box2D.Dynamics.Contacts.b2ContactEdge;
    export import  ContactResult = Box2D.Dynamics.Contacts.b2ContactResult;
    export import  Controller = Box2D.Dynamics.Controllers.b2Controller;
    export import  ControllerEdge = Box2D.Dynamics.Controllers.b2ControllerEdge;
    export import  BuoyancyController = Box2D.Dynamics.Controllers.b2BuoyancyController;
    export import  ConstantAccelController = Box2D.Dynamics.Controllers.b2ConstantAccelController;
    export import  ConstantForceController = Box2D.Dynamics.Controllers.b2ConstantForceController;
    export import  GravityController = Box2D.Dynamics.Controllers.b2GravityController;
    export import  TensorDampingController = Box2D.Dynamics.Controllers.b2TensorDampingController;
    export import  Joint = Box2D.Dynamics.Joints.b2Joint;
    export import  JointDef = Box2D.Dynamics.Joints.b2JointDef;
    export import  JointEdge = Box2D.Dynamics.Joints.b2JointEdge;
    export import  DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint;
    export import  DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef;
    export import  FrictionJoint = Box2D.Dynamics.Joints.b2FrictionJoint;
    export import  FrictionJointDef = Box2D.Dynamics.Joints.b2FrictionJointDef;
    export import  GearJoint = Box2D.Dynamics.Joints.b2GearJoint;
    export import  GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef;
    export import  LineJoint = Box2D.Dynamics.Joints.b2LineJoint;
    export import  LineJointDef = Box2D.Dynamics.Joints.b2LineJointDef;
    export import  MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint;
    export import  MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
    export import  PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint;
    export import  PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;
    export import  PullyJoint = Box2D.Dynamics.Joints.b2PullyJoint;
    export import  PullyJointDef = Box2D.Dynamics.Joints.b2PullyJointDef;
    export import  RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint;
    export import  RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
    export import  WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint;
    export import  WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;
}