import ComponentDemo from "@/pages/ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Button } from "@/components/Button/Button";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Info, Sparkles } from "lucide-react";

const TooltipPage = () => {
  const basicUsageCode = `import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/Button/Button";

<Tooltip content="This is a simple tooltip">
  <Button variant="primary">Hover me</Button>
</Tooltip>`;

  const positionsCode = `import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/Button/Button";

<Tooltip content="Tooltip on Top" position="top">
  <Button variant="outline">Top</Button>
</Tooltip>

<Tooltip content="Tooltip on Bottom" position="bottom">
  <Button variant="outline">Bottom</Button>
</Tooltip>

<Tooltip content="Tooltip on Left" position="left">
  <Button variant="outline">Left</Button>
</Tooltip>

<Tooltip content="Tooltip on Right" position="right">
  <Button variant="outline">Right</Button>
</Tooltip>`;

  const variantsCode = `import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/Button/Button";

<Tooltip content="Dark Variant" variant="dark">
  <Button variant="dark">Dark</Button>
</Tooltip>

<Tooltip content="Light Variant" variant="light">
  <Button variant="ghost">Light</Button>
</Tooltip>

<Tooltip content="Primary Variant" variant="primary">
  <Button variant="primary">Primary</Button>
</Tooltip>

<Tooltip content="Outline Variant" variant="outline">
  <Button variant="outline">Outline</Button>
</Tooltip>`;

  const delayCode = `import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/Button/Button";

<Tooltip content="Appears instantly (0ms)" delay={0}>
  <Button variant="secondary">Instant</Button>
</Tooltip>

<Tooltip content="Appears after 500ms delay" delay={500}>
  <Button variant="secondary">500ms Delay</Button>
</Tooltip>`;

  const richContentCode = `import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/Button/Button";
import { Sparkles } from "lucide-react";

<Tooltip
  variant="dark"
  position="top"
  content={
    <div className="flex items-center gap-2">
      <Sparkles size={14} className="text-yellow-400" />
      <span>
        Pro Feature: <strong>Unlimited Storage</strong>
      </span>
    </div>
  }
>
  <Button variant="primary">Pro Info</Button>
</Tooltip>`;

  const propsData = [
    {
      prop: "content",
      type: "React.ReactNode",
      default: "-",
      description: "Content displayed inside the tooltip bubble",
    },
    {
      prop: "position",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Placement of the tooltip relative to the trigger",
    },
    {
      prop: "variant",
      type: '"dark" | "light" | "primary" | "outline"',
      default: '"dark"',
      description: "Visual style variant of the tooltip",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Controls internal padding and text size",
    },
    {
      prop: "delay",
      type: "number",
      default: "0",
      description: "Delay in milliseconds before showing the tooltip",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"fadeIn"',
      description: "GSAP entrance animation when the tooltip becomes visible",
    },
    {
      prop: "asChild",
      type: "boolean",
      default: "false",
      description: "Renders trigger element directly using Radix Slot",
    },
    {
      prop: "children",
      type: "React.ReactElement",
      default: "-",
      description: "Trigger element that activates the tooltip on hover/focus",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Tooltip</h1>
        <p className="text-xl text-gray-600">
          A popup component that displays informative text when users hover or
          focus on an element.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Usage Examples</h2>

        {/* Basic Usage */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Basic Tooltip</h3>
          <ComponentDemo code={basicUsageCode}>
            <Tooltip content="This is a simple tooltip">
              <Button variant="primary">Hover me</Button>
            </Tooltip>
          </ComponentDemo>
        </div>

        {/* Positions */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Positions</h3>
          <p className="text-sm text-gray-500 mb-2">
            Tooltips can be positioned on top, bottom, left, or right.
          </p>
          <ComponentDemo code={positionsCode}>
            <div className="flex gap-4 flex-wrap justify-center items-center py-6">
              <Tooltip content="Tooltip on Top" position="top">
                <Button variant="outline">Top</Button>
              </Tooltip>

              <Tooltip content="Tooltip on Bottom" position="bottom">
                <Button variant="outline">Bottom</Button>
              </Tooltip>

              <Tooltip content="Tooltip on Left" position="left">
                <Button variant="outline">Left</Button>
              </Tooltip>

              <Tooltip content="Tooltip on Right" position="right">
                <Button variant="outline">Right</Button>
              </Tooltip>
            </div>
          </ComponentDemo>
        </div>

        {/* Variants */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Visual Variants</h3>
          <p className="text-sm text-gray-500 mb-2">
            Available in dark, light, primary, and outline visual styles.
          </p>
          <ComponentDemo code={variantsCode}>
            <div className="flex gap-4 flex-wrap justify-center items-center">
              <Tooltip content="Dark Variant" variant="dark">
                <Button variant="dark">Dark</Button>
              </Tooltip>

              <Tooltip content="Light Variant" variant="light">
                <Button variant="ghost">Light</Button>
              </Tooltip>

              <Tooltip content="Primary Variant" variant="primary">
                <Button variant="primary">Primary</Button>
              </Tooltip>

              <Tooltip content="Outline Variant" variant="outline">
                <Button variant="outline">Outline</Button>
              </Tooltip>
            </div>
          </ComponentDemo>
        </div>

        {/* Delay */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Hover Delay</h3>
          <p className="text-sm text-gray-500 mb-2">
            Add an optional delay before displaying the tooltip.
          </p>
          <ComponentDemo code={delayCode}>
            <div className="flex gap-6 flex-wrap justify-center items-center">
              <Tooltip content="Appears instantly (0ms)" delay={0}>
                <Button variant="secondary">Instant</Button>
              </Tooltip>

              <Tooltip content="Appears after 500ms delay" delay={500}>
                <Button variant="secondary">500ms Delay</Button>
              </Tooltip>
            </div>
          </ComponentDemo>
        </div>

        {/* Rich Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Rich Content (ReactNode)</h3>
          <p className="text-sm text-gray-500 mb-2">
            Support arbitrary React components and icons inside the tooltip.
          </p>
          <ComponentDemo code={richContentCode}>
            <Tooltip
              variant="dark"
              position="top"
              content={
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-yellow-400" />
                  <span>
                    Pro Feature: <strong>Unlimited Storage</strong>
                  </span>
                </div>
              }
            >
              <Button variant="primary" hoverAnimation="bounce">
                <Info size={16} className="mr-2 inline" /> Pro Info
              </Button>
            </Tooltip>
          </ComponentDemo>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default TooltipPage;
