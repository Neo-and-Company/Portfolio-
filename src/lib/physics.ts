
// src/lib/physics.ts
export class PhysicsPoint {
  public position: { x: number; y: number; z: number };
  public velocity: { x: number; y: number; z: number };
  public target: { x: number; y: number; z: number };
  private stiffness = 0.05; // Reduced stiffness for smoother movement
  private damping = 0.75;  // Adjusted damping

  constructor(x: number, y: number, z: number) {
    this.position = { x, y, z };
    this.velocity = { x: 0, y: 0, z: 0 };
    this.target = { x, y, z };
  }

  setTarget(x: number, y: number, z: number): void {
    this.target.x = x;
    this.target.y = y;
    this.target.z = z;
  }

  update(): void {
    const dx = this.target.x - this.position.x;
    const dy = this.target.y - this.position.y;
    const dz = this.target.z - this.position.z;

    const ax = dx * this.stiffness;
    const ay = dy * this.stiffness;
    const az = dz * this.stiffness;

    this.velocity.x += ax;
    this.velocity.y += ay;
    this.velocity.z += az;

    this.velocity.x *= this.damping;
    this.velocity.y *= this.damping;
    this.velocity.z *= this.damping;

    // Add a small threshold to stop micro-movements
    if (Math.abs(this.velocity.x) < 0.01) this.velocity.x = 0;
    if (Math.abs(this.velocity.y) < 0.01) this.velocity.y = 0;
    if (Math.abs(this.velocity.z) < 0.01) this.velocity.z = 0;
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;
  }
}
