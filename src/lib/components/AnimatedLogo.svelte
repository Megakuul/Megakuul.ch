<script lang="ts">
    
    let animationController: SVGAnimateElement;

    export const animate = () => {
        if (animationController) {
            animationController.beginElement();
        }
    }

    export let width: string;
</script>

<!--
    @component
    This will animate the main Logo from a svg animation on trigger

    To trigger the animation, you usually use something like:
    ```javascript
    <script>
        let animatedLogo: AnimatedLogo;

        $: checked, animateLogo();

        function animateLogo() {
            if (checked && animatedLogo) {
                animatedLogo.animate();
            }
        }
    </script>

    <AnimatedLogo bind:this={animatedLogo}></AnimatedLogo>
    ```
-->
<svg width="{width}" viewBox="0 0 586 713" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; max-height: 100%;">
    <path d="M50 682V143L262.97 412.5M262.97 412.5L475.939 682M262.97 412.5L552 143" stroke="url(#paint0_linear_10_3)" stroke-width="99" stroke-dasharray="0,0,0,1621.164306640625">
        <animate bind:this={animationController} attributeType="XML" attributeName="stroke-dasharray" repeatCount="1"  dur="1.5s" values="0,810.5821533203125,0,810.5821533203125; 
            0,810.5821533203125,810.5821533203125,0; 
            1621.164306640625,0,0,0" keyTimes="0; 0.1; 1" fill="freeze">
        </animate>
    </path>
    <defs>
        <linearGradient id="paint0_linear_10_3" x1="407.485" y1="143" x2="219.8" y2="659.815" gradientUnits="userSpaceOnUse">
        <stop stop-color="white" stop-opacity="0.25"></stop>
        <stop offset="1" stop-color="white"></stop>
        </linearGradient>
    </defs>
</svg>

